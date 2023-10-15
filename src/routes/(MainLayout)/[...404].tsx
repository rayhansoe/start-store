import { Title } from 'solid-start';

export default function NotFound() {
	return (
		<>
			<Title>404: This page could not be found.</Title>
			<div class='h-[90vh] text-center flex flex-col items-center justify-center' >
				<div class='divide-x divide-gray-200' >
					<h1 class='inline-block mr-5 text-2xl font-medium align-top leading-10' >
						404
					</h1>
					<div class='inline-block' >
						<h2 class='text-sm leading-10 m-0 ml-5' >This page could not be found.</h2>
					</div>
				</div>
			</div>
		</>
	);
}