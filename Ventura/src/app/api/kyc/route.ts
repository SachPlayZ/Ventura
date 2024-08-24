"use server";

import { NextResponse } from 'next/server';
import connectToDatabase from '@/app/_middleware/mongodb';
import KYC from '@/app/_models/schema';

async function posthandler(req: Request) {
    try {
        await connectToDatabase();

        const body = await req.json();
        const kycData = new KYC(body);

        await kycData.save();

        return NextResponse.json({ message: 'KYC data saved successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error saving KYC data:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

async function gethandler(req: Request) {
    try {
        await connectToDatabase();
        const url = new URL(req.url);
        const email = url.searchParams.get('email');

        if (!email) {
            return NextResponse.json({ message: 'Email is required' }, { status: 400 });
        }
        const kycData = await KYC.findOne({ email }).exec();

        if (!kycData) {
            return NextResponse.json({ message: 'No KYC data found' }, { status: 404 });
        }

        return NextResponse.json(kycData, { status: 200 });
    } catch (error) {
        console.error('Error retrieving KYC data:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

async function patchhandler(req: Request) {
    try {
        await connectToDatabase();

        const url = new URL(req.url);
        const email = url.searchParams.get('email');

        if (!email) {
            return NextResponse.json({ message: 'Email is required' }, { status: 400 });
        }

        const updates = await req.json();

        // Validate that updates object is not empty
        if (Object.keys(updates).length === 0) {
            return NextResponse.json({ message: 'No data provided for update' }, { status: 400 });
        }

        const kycData = await KYC.findOneAndUpdate({ email }, updates, { new: true }).exec();

        if (!kycData) {
            return NextResponse.json({ message: 'No KYC data found for this email' }, { status: 404 });
        }

        return NextResponse.json({ message: 'KYC data updated successfully', kycData }, { status: 200 });
    } catch (error) {
        console.error('Error updating KYC data:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

async function deletehandler(req: Request) {
    try {
        await connectToDatabase();

        const url = new URL(req.url);
        const email = url.searchParams.get('email');

        if (!email) {
            return NextResponse.json({ message: 'Email is required' }, { status: 400 });
        }

        const kycData = await KYC.findOneAndDelete({ email }).exec();

        if (!kycData) {
            return NextResponse.json({ message: 'No KYC data found for this email' }, { status: 404 });
        }

        return NextResponse.json({ message: 'KYC data deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting KYC data:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export { posthandler as POST, gethandler as GET, patchhandler as PATCH, deletehandler as DELETE };