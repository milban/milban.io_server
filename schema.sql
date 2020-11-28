CREATE SCHEMA milbanio;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE "milbanio"."User" (
  id uuid DEFAULT uuid_generate_v4 (),
  PRIMARY KEY (id),
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
  "userId" VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);