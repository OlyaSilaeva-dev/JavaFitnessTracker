CREATE TABLE IF NOT EXISTS image
(
    "id"                BIGSERIAL PRIMARY KEY,
    "bytes"             OID,
    "content_type"      VARCHAR(255),
    "name"              VARCHAR(255),
    "original_filename" VARCHAR(255),
    "size"              BIGINT
);

CREATE TABLE IF NOT EXISTS user_data
(
    "id"         BIGSERIAL PRIMARY KEY,
    "email"      VARCHAR(50) NOT NULL,
    "password"   VARCHAR(60) NOT NULL,
    "name"       VARCHAR(60),
    "weight"     DOUBLE PRECISION,
    "height"     DOUBLE PRECISION,
    "gender"     VARCHAR(10) CHECK ("gender" IN ('MALE', 'FEMALE')),
    "purpose"    VARCHAR(10) CHECK ("purpose" IN ('LOSE', 'MAINTAIN', 'GAIN')),
    "avatar"     BIGINT,
    "role"       VARCHAR(10) CHECK ("role" IN ('ADMIN', 'USER')),
    "activity"   VARCHAR(10) CHECK ("activity" IN ('LOWEST', 'LOW', 'MEDIUM', 'HIGH', 'HIGHEST')),
    "birth_year" INTEGER,
    FOREIGN KEY ("avatar") REFERENCES image ("id") ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS workout
(
    "id"   BIGSERIAL PRIMARY KEY,
    "name" VARCHAR(60) UNIQUE
);

CREATE TABLE IF NOT EXISTS exercise
(
    "id"        BIGSERIAL PRIMARY KEY,
    "name"      VARCHAR(60) UNIQUE,
    "intensity" VARCHAR(255) CHECK ("intensity" IN ('LIGHT', 'MEDIUM', 'HARD')),
    "calories"  DOUBLE PRECISION,
    "image"     BIGINT,
    FOREIGN KEY ("image") REFERENCES image ("id") ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS product
(
    "id"            BIGSERIAL PRIMARY KEY,
    "name"          VARCHAR(60) UNIQUE,
    "calories"      DOUBLE PRECISION CHECK ("calories" >= 0),
    "proteins"      DOUBLE PRECISION CHECK ("proteins" >= 0),
    "fats"          DOUBLE PRECISION CHECK ("fats" >= 0),
    "carbohydrates" DOUBLE PRECISION CHECK ("carbohydrates" >= 0),
    "image"         BIGINT,
    FOREIGN KEY ("image") REFERENCES image ("id") ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS dayprogress
(
    "id"             BIGSERIAL PRIMARY KEY,
    "user_id"        BIGINT,
    "recording_date" DATE,
    FOREIGN KEY ("user_id") REFERENCES user_data ("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS dayprogress_product
(
    "id"               BIGSERIAL PRIMARY KEY,
    "dayprogress_id"   BIGINT,
    "product_id"       BIGINT,
    "grams_of_product" DOUBLE PRECISION,
    "meal"             VARCHAR(255) CHECK ("meal" IN ('BREAKFAST', 'LUNCH', 'DINNER', 'SNACK')),
    FOREIGN KEY ("dayprogress_id") REFERENCES dayprogress ("id") ON DELETE CASCADE,
    FOREIGN KEY ("product_id") REFERENCES product ("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS dayprogress_workout
(
    "id"             BIGSERIAL PRIMARY KEY,
    "dayprogress_id" BIGINT,
    "workout_id"     BIGINT,
    FOREIGN KEY ("dayprogress_id") REFERENCES dayprogress ("id") ON DELETE CASCADE,
    FOREIGN KEY ("workout_id") REFERENCES workout ("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS workout_exercise
(
    "id"          BIGSERIAL PRIMARY KEY,
    "workout_id"  BIGINT,
    "exercise_id" BIGINT,
    "interval"    BIGINT,
    FOREIGN KEY ("exercise_id") REFERENCES exercise ("id") ON DELETE CASCADE,
    FOREIGN KEY ("workout_id") REFERENCES workout ("id") ON DELETE CASCADE
);

CREATE TABLE logs
(
    id         BIGSERIAL PRIMARY KEY,
    table_name TEXT NOT NULL,
    operation  TEXT NOT NULL CHECK (operation IN ('INSERT', 'UPDATE', 'DELETE')),
    record_id  BIGINT,
    timestamp  TIMESTAMP DEFAULT NOW(),
    old_data   JSONB,
    new_data   JSONB
);

CREATE OR REPLACE FUNCTION log_changes() RETURNS TRIGGER AS
$$
BEGIN
    INSERT INTO logs (table_name, operation, record_id, timestamp, old_data, new_data)
    VALUES (TG_TABLE_NAME,
            TG_OP,
            COALESCE(NEW.id, OLD.id),
            CURRENT_TIMESTAMP,
            CASE WHEN TG_OP IN ('UPDATE', 'DELETE') THEN row_to_json(OLD) END,
            CASE WHEN TG_OP IN ('UPDATE', 'INSERT') THEN row_to_json(NEW) END);
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_data_log_trigger
    AFTER INSERT OR UPDATE OR DELETE
    ON user_data
    FOR EACH ROW
EXECUTE FUNCTION log_changes();

CREATE TRIGGER product_log_trigger
    AFTER INSERT OR UPDATE OR DELETE
    ON product
    FOR EACH ROW
EXECUTE FUNCTION log_changes();

CREATE TRIGGER exercise_log_trigger
    AFTER INSERT OR UPDATE OR DELETE
    ON exercise
    FOR EACH ROW
EXECUTE FUNCTION log_changes();

CREATE TRIGGER dayprogress_product_log_trigger
    AFTER INSERT OR UPDATE OR DELETE
    ON dayprogress_product
    FOR EACH ROW
EXECUTE FUNCTION log_changes();

CREATE TRIGGER dayprogress_workout_log_trigger
    AFTER INSERT OR UPDATE OR DELETE
    ON dayprogress_workout
    FOR EACH ROW
EXECUTE FUNCTION log_changes();

CREATE TRIGGER workout_exercise_log_trigger
    AFTER INSERT OR UPDATE OR DELETE
    ON workout_exercise
    FOR EACH ROW
EXECUTE FUNCTION log_changes();

--
-- -- -- --
-- DROP TABLE "dayprogress_workout";
-- DROP TABLE "dayprogress_product";
-- DROP TABLE "workout_exercise";
-- drop table image CASCADE;
-- DROP TABLE "product";
-- DROP table "exercise";
-- DROP TABLE "dayprogress";
-- DROP TABLE "user" CASCADE;
-- DROP TABLE "user_data" CASCADE;
