-- Add missing payment and signature columns
ALTER TABLE TowJob ADD COLUMN paymentMethod TEXT;
ALTER TABLE TowJob ADD COLUMN paymentStatus TEXT DEFAULT 'PENDING';
ALTER TABLE TowJob ADD COLUMN paymentAmount REAL;
ALTER TABLE TowJob ADD COLUMN paymentTransactionId TEXT;
ALTER TABLE TowJob ADD COLUMN customerSignatureUrl TEXT;
ALTER TABLE TowJob ADD COLUMN impoundLotSignatureUrl TEXT;
ALTER TABLE TowJob ADD COLUMN dropoffNotes TEXT;
ALTER TABLE TowJob ADD COLUMN dropoffCompletedAt DATETIME;
ALTER TABLE TowJob ADD COLUMN paymentCompletedAt DATETIME;