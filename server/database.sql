CREATE DATABASE pern_work_app

CREATE TABLE shifts (
    shift_id SERIAL PRIMARY KEY,
    hourly_wage DECIMAL DEFAULT '16.75',
    worked_hours SMALLINT NOT NULL,
    worked_minutes SMALLINT NOT NULL,
    break_hours SMALLINT,
    break_minutes SMALLINT,
    total_worked_hours DECIMAL,
    net_pay DECIMAL,
    details VARCHAR(555),
    tdy_date DATE DEFAULT now()::timestamp(0)
);