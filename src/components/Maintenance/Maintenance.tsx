export default function Maintenance() {
	return (
		<main className='flex min-h-screen items-center justify-center bg-gray-50 px-4'>
			<div className='w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg'>
				<h1 className='mb-3 font-semibold text-2xl text-gray-900'>Site en maintenance</h1>

				<p className='mb-6 text-gray-600'>
					Le site est temporairement indisponible.
					<br />
					Il sera de retour très bientôt.
				</p>

				<div className='inline-flex items-center justify-center gap-2 text-gray-500 text-sm'>
					<span className='h-2 w-2 animate-pulse rounded-full bg-yellow-400' />
					Maintenance en cours
				</div>
			</div>
		</main>
	)
}
