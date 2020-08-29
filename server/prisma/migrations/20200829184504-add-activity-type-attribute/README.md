# Migration `20200829184504-add-activity-type-attribute`

This migration has been generated at 8/29/2020, 6:45:04 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."ActivityTypeAttribute" (
"activityTypeId" integer  NOT NULL ,
"id" SERIAL,
"name" text  NOT NULL ,
"value" integer  NOT NULL ,
    PRIMARY KEY ("id"))

ALTER TABLE "public"."ActivityTypeAttribute" ADD FOREIGN KEY ("activityTypeId")REFERENCES "public"."ActivityType"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200719215442-init..20200829184504-add-activity-type-attribute
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -14,8 +14,16 @@
   id        Int      @default(autoincrement()) @id
   name String
 }
+model ActivityTypeAttribute {
+  id        Int      @default(autoincrement()) @id
+  activityTypeId Int
+  activityType ActivityType @relation(fields: [activityTypeId], references: [id])
+  name String
+  value Int
+}
+
 model RecordedActivity {
   id        Int      @default(autoincrement()) @id
   activityTypeId Int
   activityType ActivityType @relation(fields: [activityTypeId], references: [id])
```


