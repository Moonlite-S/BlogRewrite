export function LoadingPage() {
    console.log("LoadingPage");
    return (
        <div className="min-h-screen w-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-500" />
                <p className="text-lg text-gray-600">Loading...</p>
            </div>
        </div>
    );
}

