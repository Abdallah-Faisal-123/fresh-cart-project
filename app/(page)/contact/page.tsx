import React from 'react';

export default function ContactPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Contact Us</h1>
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <p className="text-gray-600 mb-6 text-center">Have a question? We'd love to hear from you.</p>
                <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <span className="font-bold">Email:</span>
                        <span>support@freshcart.com</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <span className="font-bold">Phone:</span>
                        <span>+1 (800) 123-4567</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
