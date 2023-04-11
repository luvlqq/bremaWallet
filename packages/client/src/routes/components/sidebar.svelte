<script>
    export let activeMenu = '';
</script>

<style>
    .menu {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .menu a {
        text-decoration: none;
        color: #333;
        width: 100%;
        display: block;
        padding: 10px;
        margin-bottom: 10px;
    }

    .menu a.active {
        background-color: #772def;
    }

    .menu a {
        color: black;
    }

    .menu a:hover {
        color: white;
    }

    .active {
        background-color: purple;
        color: white;
    }

    .menu ul {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
    .menu li {
        width: 100%;
    }

</style>

<div class="menu">
    <div class="grid grid-cols-12 gap-4">
        <aside id="default-sidebar" class="fixed inset-y-auto top-auto left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <ul class="space-y-4 font-medium">
                    <li>
                        <a href="../accountPage" class="flex items-center p-2 text-purple-800 rounded-lg dark:text-white hover:bg-purple-600 dark:hover:bg-gray-700" class:active={activeMenu === "home"}>
                            <span class="ml-3">Home</span>
                        </a>
                    </li>
                    <li>
                        <a href="../accountPage/history" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-purple-600 dark:hover:bg-gray-700" class:active={activeMenu === "history"}>
                            <span class="flex-1 ml-3 whitespace-nowrap">History</span>
                        </a>
                    </li>
                    <li>
                        <a href="../accountPage/inbox" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-purple-600 dark:hover:bg-gray-700" class:active={activeMenu === "inbox"}>
                            <span class="flex-1 ml-3 whitespace-nowrap">Inbox</span>
                        </a>
                    </li>
                    <li>
                        <a href="../accountPage/help" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-purple-600 dark:hover:bg-gray-700" class:active={activeMenu === "help"}>
                            <span class="flex-1 ml-3 whitespace-nowrap">Help</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    </div>
</div>


