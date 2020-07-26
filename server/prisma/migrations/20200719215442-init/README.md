# Migration `20200719215442-init`

This migration has been generated at 7/19/2020, 9:54:42 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."RecordedActivity" ADD COLUMN "userId" integer   ;

ALTER TABLE "public"."User" ADD COLUMN "apiToken" text   ;

ALTER TABLE "public"."RecordedActivity" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE SET NULL  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200719215442-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,33 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
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
+  recordedActivities RecordedActivity[]
+  apiToken String?
+}
```


