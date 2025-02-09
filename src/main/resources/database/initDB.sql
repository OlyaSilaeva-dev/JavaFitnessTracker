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
    "activity"   VARCHAR(10) CHECK ("activity" IN ('LOWEST', 'LOWE', 'MEDIUM', 'HIGH', 'HIGHEST')),
    "birth_year" INTEGER,
    FOREIGN KEY ("avatar") REFERENCES image ("id")
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
    FOREIGN KEY ("image") REFERENCES image ("id")
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
    FOREIGN KEY ("image") REFERENCES image ("id")
);

CREATE TABLE IF NOT EXISTS dayprogress
(
    "id"             BIGSERIAL PRIMARY KEY,
    "user_id"        BIGINT,
    "recording_date" DATE,
    FOREIGN KEY ("user_id") REFERENCES user_data ("id")
);

CREATE TABLE IF NOT EXISTS dayprogress_product
(
    "id"               BIGSERIAL PRIMARY KEY,
    "dayprogress_id"   BIGINT,
    "product_id"       BIGINT,
    "grams_of_product" DOUBLE PRECISION,
    "meal"             VARCHAR(255) CHECK ("meal" IN ('BREAKFAST', 'LUNCH', 'DINNER', 'SNACK')),
    FOREIGN KEY ("dayprogress_id") REFERENCES dayprogress ("id"),
    FOREIGN KEY ("product_id") REFERENCES product ("id")
);

CREATE TABLE IF NOT EXISTS dayprogress_workout
(
    "id"             BIGSERIAL PRIMARY KEY,
    "dayprogress_id" BIGINT,
    "workout_id"     BIGINT,
    FOREIGN KEY ("dayprogress_id") REFERENCES dayprogress ("id"),
    FOREIGN KEY ("workout_id") REFERENCES workout ("id")
);

CREATE TABLE IF NOT EXISTS workout_exercise
(
    "id"          BIGSERIAL PRIMARY KEY,
    "workout_id"  BIGINT,
    "exercise_id" BIGINT,
    "interval"    BIGINT,
    FOREIGN KEY ("exercise_id") REFERENCES exercise ("id"),
    FOREIGN KEY ("workout_id") REFERENCES workout ("id")
);


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
