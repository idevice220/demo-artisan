-- AlterTable
ALTER TABLE "EstimateOption" ADD COLUMN     "tenant" TEXT NOT NULL DEFAULT 'demo';

-- AlterTable
ALTER TABLE "EstimateType" ADD COLUMN     "tenant" TEXT NOT NULL DEFAULT 'demo';

-- AlterTable
ALTER TABLE "FaqItem" ADD COLUMN     "tenant" TEXT NOT NULL DEFAULT 'demo';

-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "tenant" TEXT NOT NULL DEFAULT 'demo';

-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "tenant" TEXT NOT NULL DEFAULT 'demo';

-- AlterTable
ALTER TABLE "Meta" DROP COLUMN "lastReset",
DROP COLUMN "seededAt",
ADD COLUMN     "lastSweep" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "ProcessStep" ADD COLUMN     "tenant" TEXT NOT NULL DEFAULT 'demo';

-- AlterTable
ALTER TABLE "Realisation" ADD COLUMN     "tenant" TEXT NOT NULL DEFAULT 'demo';

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "tenant" TEXT NOT NULL DEFAULT 'demo';

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "tenant" TEXT NOT NULL DEFAULT 'demo';

-- AlterTable
ALTER TABLE "Setting" DROP CONSTRAINT "Setting_pkey",
ADD COLUMN     "tenant" TEXT NOT NULL DEFAULT 'demo',
ADD CONSTRAINT "Setting_pkey" PRIMARY KEY ("tenant", "key");

-- AlterTable
ALTER TABLE "Tarif" ADD COLUMN     "tenant" TEXT NOT NULL DEFAULT 'demo';

-- AlterTable
ALTER TABLE "Zone" ADD COLUMN     "tenant" TEXT NOT NULL DEFAULT 'demo';

-- CreateTable
CREATE TABLE "Tenant" (
    "id" TEXT NOT NULL,
    "seedVersion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EstimateOption_tenant_idx" ON "EstimateOption"("tenant");

-- CreateIndex
CREATE INDEX "EstimateType_tenant_idx" ON "EstimateType"("tenant");

-- CreateIndex
CREATE INDEX "FaqItem_tenant_idx" ON "FaqItem"("tenant");

-- CreateIndex
CREATE INDEX "Lead_tenant_idx" ON "Lead"("tenant");

-- CreateIndex
CREATE INDEX "Media_tenant_idx" ON "Media"("tenant");

-- CreateIndex
CREATE INDEX "ProcessStep_tenant_idx" ON "ProcessStep"("tenant");

-- CreateIndex
CREATE INDEX "Realisation_tenant_idx" ON "Realisation"("tenant");

-- CreateIndex
CREATE INDEX "Review_tenant_idx" ON "Review"("tenant");

-- CreateIndex
CREATE INDEX "Service_tenant_idx" ON "Service"("tenant");

-- CreateIndex
CREATE INDEX "Tarif_tenant_idx" ON "Tarif"("tenant");

-- CreateIndex
CREATE INDEX "Zone_tenant_idx" ON "Zone"("tenant");

