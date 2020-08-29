# Migration `20200829184809-uniq-activity-type-attribute-name`

This migration has been generated at 8/29/2020, 6:48:09 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE UNIQUE INDEX "ActivityTypeAttribute.name" ON "public"."ActivityTypeAttribute"("name")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200829184504-add-activity-type-attribute..20200829184809-uniq-activity-type-attribute-name
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
@@ -18,9 +18,9 @@
 model ActivityTypeAttribute {
   id        Int      @default(autoincrement()) @id
   activityTypeId Int
   activityType ActivityType @relation(fields: [activityTypeId], references: [id])
-  name String
+  name String @unique
   value Int
 }
 model RecordedActivity {
```


