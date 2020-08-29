# Migration `20200829192901-fix-uniq-activity-type-attribute`

This migration has been generated at 8/29/2020, 7:29:01 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
DROP INDEX "public"."ActivityTypeAttribute.name"

CREATE UNIQUE INDEX "ActivityTypeAttribute.activityTypeId_name" ON "public"."ActivityTypeAttribute"("activityTypeId","name")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200829184809-uniq-activity-type-attribute-name..20200829192901-fix-uniq-activity-type-attribute
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
@@ -18,10 +18,12 @@
 model ActivityTypeAttribute {
   id        Int      @default(autoincrement()) @id
   activityTypeId Int
   activityType ActivityType @relation(fields: [activityTypeId], references: [id])
-  name String @unique
+  name String
   value Int
+
+  @@unique([activityTypeId, name])
 }
 model RecordedActivity {
   id        Int      @default(autoincrement()) @id
```


