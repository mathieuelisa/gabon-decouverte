export default function ActivityExplorerSkeleton() {
	return (
		<section className='relative h-[400px] w-full min-w-[235px] overflow-hidden rounded-lg border border-gray-50 bg-white shadow dark:border-gray-700 dark:bg-gray-800'>
			{/* Image placeholder */}
			<div className='relative'>
				<div className='h-[180px] w-full animate-pulse bg-gray-200 dark:bg-gray-700' />

				{/* Heart placeholder at top-right */}
				<div className='absolute top-5 right-5 h-6 w-6 animate-pulse rounded-full bg-gray-300/80 ring-2 ring-white/70 dark:bg-gray-600/80' />
			</div>

			{/* Body */}
			<div className='px-4 pt-2 pb-4'>
				<div className='mt-2 flex items-center justify-between'>
					{/* Title line */}
					<div className='h-5 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700' />

					{/* Rating (star + number) */}
					<div className='flex items-center gap-1'>
						<div className='h-4 w-3 animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
						<div className='h-4 w-5 animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
					</div>
				</div>

				{/* Description lines */}
				<div className='my-3 space-y-3'>
					<br />
					<div className='h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
					<div className='h-4 w-5/6 animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
					<div className='h-4 w-5/6 animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
					<div className='h-4 w-5/6 animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
					<div className='h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
				</div>
			</div>
		</section>
	)
}
