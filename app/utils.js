export function capitalizeStr(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export function formatDate(date) {
  return date.toLocaleString("de-CH", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export function getUtcDate(date, time, timezoneOffset) {
  const offsetHours = Math.floor(Math.abs(timezoneOffset / 60));
  const offsetMinutes = Math.abs(timezoneOffset) % 60;
  const sign = timezoneOffset > 0 ? "-" : "+";

  const isoWithOffset =
    `${date}T${time}:00${sign}` +
    String(offsetHours).padStart(2, "0") +
    ":" +
    String(offsetMinutes).padStart(2, "0");

  const utcDate = new Date(isoWithOffset);
  return utcDate;
}

export function formatISODateLocal(utcString) {
  const d = new Date(utcString);
  return d.toLocaleDateString("sv-SE");
}

export function formatISODate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatTime(dateStr) {
  return new Date(dateStr).toLocaleTimeString("de-CH", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function formatTimeLocal(utcString) {
  const d = new Date(utcString);
  return d.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });
}

export function calculateDuration(startDate) {
  if (!startDate) return null;
  const diffMs = Date.now() - new Date(startDate).getTime();
  const totalSeconds = Math.floor(diffMs / 1000);

  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
    2,
    "0",
  );
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

export function filterToday(logs) {
  if (!logs.length) return [];

  const now = new Date();
  const startUTC = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      0,
      0,
      0,
    ),
  );
  const endUTC = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      23,
      59,
      59,
      999,
    ),
  );

  return logs
    .filter((log) => {
      const logDate = new Date(log.date);
      return logDate >= startUTC && logDate <= endUTC;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function filterTodayNaps(naps) {
  if (!naps || !naps.length) return [];

  const now = new Date();

  const startUTC = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      0,
      0,
      0,
      0,
    ),
  );
  const endUTC = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      23,
      59,
      59,
      999,
    ),
  );

  return naps
    .filter((nap) => {
      const napStart = new Date(nap.start);
      return napStart >= startUTC && napStart <= endUTC;
    })
    .sort((a, b) => new Date(b.start) - new Date(a.start));
}

export function getNapDuration(nap) {
  const start = new Date(nap.start);
  const stop = new Date(nap.stop);

  const durationMs = stop - start;
  const totalMinutes = Math.floor(durationMs / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const formatted = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

  return formatted;
}

export function getTodayLogsDesc(...logsGroup) {
  const now = new Date();

  const startUTC = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      0,
      0,
      0,
      0,
    ),
  );
  const endUTC = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      23,
      59,
      59,
      999,
    ),
  );

  const allLogs = logsGroup.flat();
  const todayLogs = allLogs.filter((log) => {
    if (!log || (!log.date && !log.start)) {
      console.log("Skipping invalid log:", log);
      return false;
    }
    const sortDate = new Date(log.date || log.start);
    return sortDate >= startUTC && sortDate <= endUTC;
  });

  const sortedDesc = todayLogs.sort(
    (a, b) => new Date(b.date || b.start) - new Date(a.date || a.start),
  );

  return sortedDesc;
}

export function getAllLogsDesc(...logsGroup) {
  const allLogs = logsGroup.flat();
  const sortedDesc = allLogs.sort(
    (a, b) => new Date(b.date || b.start) - new Date(a.date || a.start),
  );
  return sortedDesc;
}
