# Migration `20200714210314-init`

This migration has been generated at 7/14/2020, 9:03:14 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."ActivityType" (
    "id" SERIAL,
    "name" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."RecordedActivity" (
    "activityTypeId" integer  NOT NULL ,
    "id" SERIAL,
    "recordedAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "recordedById" integer  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."User" (
    "id" SERIAL,
    "name" text   ,
    PRIMARY KEY ("id")
) 

CREATE  INDEX "recordedById" ON "public"."RecordedActivity"("recordedById")

ALTER TABLE "public"."RecordedActivity" ADD FOREIGN KEY ("activityTypeId")REFERENCES "public"."ActivityType"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."RecordedActivity" ADD FOREIGN KEY ("recordedById")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200714210314-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,32 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url      = env("DATABASE_URL")
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model ActivityType {
+  id        Int      @default(autoincrement()) @id
+  name String
+}
+
+model RecordedActivity {
+  id        Int      @default(autoincrement()) @id
+  activityTypeId Int
+  activityType ActivityType @relation(fields: [activityTypeId], references: [id])
+  recordedBy User @relation(name: "userRecordedActivities", fields: [recordedById], references: [id])
+  recordedById Int
+  recordedAt DateTime @default(now())
+  @@index([recordedById], name: "recordedById")
+}
+
+model User {
+  id      Int      @default(autoincrement()) @id
+  name    String?
+  recordedActivities RecordedActivity[] @relation(name: "userRecordedActivities", references: [id])
+}
```


