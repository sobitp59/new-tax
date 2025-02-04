import Navbar from "@/components/navbar";
import ReferenceTable from "@/components/reference-table";

export default function Reference() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container w-full lg:max-w-[900px] mx-auto py-6 px-4">
                <ReferenceTable />
            </main>
        </div>
    )
}
