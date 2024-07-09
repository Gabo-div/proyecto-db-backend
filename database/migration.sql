-- User tables
CREATE TABLE IF NOT EXISTS user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS teacher (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ic TEXT NOT NULL,
  name TEXT NOT NULL,
  last_name TEXT NOT NULL,

  user_id INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS representative (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ic TEXT NOT NULL,
  name TEXT NOT NULL,
  last_name TEXT NOT NULL,

  user_id INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS coordinator (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ic TEXT NOT NULL,
  name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  entry_date DATE NOT NULL,
  withdraw_date DATE,

  user_id INTEGER NOT NULL
);

-- Student tables
CREATE TABLE IF NOT EXISTS student (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ic TEXT NOT NULL,
  name TEXT NOT NULL,
  last_name TEXT NOT NULL
);

-- Course tables
CREATE TABLE IF NOT EXISTS period (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS course (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  year INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS qualification (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  value INTEGER NOT NULL,
  section INTEGER NOT NULL,
  lapse INTEGER NOT NULL,

  student_id INTEGER NOT NULL,
  charge_id INTEGER NOT NULL
);

--- Relationships
CREATE TABLE IF NOT EXISTS representative_student (
  representative_id INTEGER NOT NULL,
  student_id INTEGER NOT NULL,

  PRIMARY KEY (representative_id, student_id)
);

CREATE TABLE IF NOT EXISTS charge (
  id INTEGER PRIMARY KEY AUTOINCREMENT,

  period_id INTEGER NOT NULL,
  course_id INTEGER NOT NULL,
  teacher_id INTEGER NOT NULL
);
