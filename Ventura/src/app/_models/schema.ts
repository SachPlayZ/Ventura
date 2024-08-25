import mongoose, { Schema, Document } from "mongoose";

interface IKYC extends Document {
    address: string;
    fullName: string;
    dateOfBirth: Date;
    nationality: string;
    gender: string;
    residentialAddress: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    email: string;
    phoneNumber: string;
    identification: {
        idNumber: string;
        idType: string;
        issuingAuthority: string;
    };
    proofOfIdentity: string;
    proofOfAddress: string;
    occupation: string;
    companyName?: string;
}

const KYCSchema: Schema = new mongoose.Schema({
    address: { type: String, required: true },
    fullName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    nationality: { type: String, required: true },
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
    residentialAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    identification: {
        idNumber: { type: String, required: true },
        idType: { type: String, required: true, enum: ['PAN', 'Aadhar', 'Passport', 'Social Security Number'] },
        issuingAuthority: { type: String, required: true }
    },
    proofOfIdentity: { type: String, required: true },
    proofOfAddress: { type: String, required: true },
    occupation: { type: String, required: true },
    companyName: { type: String }
});

export default mongoose.models.KYC || mongoose.model<IKYC>("KYC", KYCSchema);
