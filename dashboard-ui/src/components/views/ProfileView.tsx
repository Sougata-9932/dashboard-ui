import { Mail, Calendar, MapPin, Award, BarChart } from 'lucide-react';

export function ProfileView() {
    return (
        <div className="max-w-4xl mx-auto py-8 animate-fadeIn">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">User Profile</h2>

            {/* Profile Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-6">
                <div className="h-32 bg-gradient-to-r from-slate-800 to-slate-600"></div>
                <div className="px-8 pb-8">
                    <div className="flex items-end gap-6 -mt-16">
                        <div className="w-32 h-32 rounded-2xl bg-white shadow-lg border-4 border-white overflow-hidden">
                            <img
                                src="https://ui-avatars.com/api/?name=Admin+User&size=128&background=0f172a&color=fff"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="pb-4">
                            <h3 className="text-2xl font-bold text-slate-800">Admin User</h3>
                            <p className="text-slate-500">AI Operations Manager</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                            <Mail size={20} className="text-slate-600" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">Email</p>
                            <p className="font-medium text-slate-800">admin@example.com</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                            <Calendar size={20} className="text-slate-600" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">Member Since</p>
                            <p className="font-medium text-slate-800">January 2024</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                            <MapPin size={20} className="text-slate-600" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">Location</p>
                            <p className="font-medium text-slate-800">San Francisco, CA</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                            <Award size={20} className="text-slate-600" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">Documents Processed</p>
                            <p className="font-medium text-slate-800">1,247</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <BarChart size={20} />
                    Activity Overview
                </h3>
                <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 rounded-xl bg-slate-50">
                        <p className="text-2xl font-bold text-slate-800">156</p>
                        <p className="text-sm text-slate-500 mt-1">Files Uploaded</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-slate-50">
                        <p className="text-2xl font-bold text-slate-800">42</p>
                        <p className="text-sm text-slate-500 mt-1">Active Agents</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-slate-50">
                        <p className="text-2xl font-bold text-slate-800">98%</p>
                        <p className="text-sm text-slate-500 mt-1">Success Rate</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
