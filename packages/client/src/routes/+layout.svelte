<script>
	import '../app.css';
	import Nav from '../routes/components/Navbar.svelte';
    import Foot from '../routes/components/Footer.svelte'
</script>

<Nav/>
<div class>
	<slot/>
</div>
<Foot/>

