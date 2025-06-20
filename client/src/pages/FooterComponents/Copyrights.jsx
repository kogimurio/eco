export default function CopyRights() {
    return (
        <div className="bg-gray-800 border-t border-gray-700 py-4">
            <div className="w-[90%] mx-auto text-center">
                <p className="text-sm text-stone-400 tracking-wide">
                    &copy; {new Date().getFullYear()} <span className="font-semibold text-white">Fashionova</span>. All rights reserved.
                </p>
            </div>
        </div>
    );
}
