<script>
	const logout = () => {
		const response = fetch(`http://localhost:3000/api/auth/signout`, {
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include'
		});
		const content = response.json();
		console.log(content.message);
	};
</script>

<nav class="bg-purple-800">
	<div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mb-50">
		<div class="relative flex items-center justify-between h-16">
			<div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
				<div class="flex-shrink-0">
					<a href="/" class="text-white text-xl font-bold">Brema Wallet</a>
				</div>
			</div>
			<div class="sm:block sm:ml-6">
				<div class="flex space-x-4">
					<a
						href="/auth"
						class="text-white hover:bg-white-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
						on:click={logout}>Log Out</a
					>
				</div>
			</div>
		</div>
	</div>
</nav>
