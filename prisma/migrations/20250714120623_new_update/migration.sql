/*
  Warnings:

  - You are about to drop the `sensor_data` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "sensor_data" DROP CONSTRAINT "sensor_data_sensorId_fkey";

-- DropTable
DROP TABLE "sensor_data";
