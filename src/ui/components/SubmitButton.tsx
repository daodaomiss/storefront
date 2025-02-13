export const SubmitButton = ({ isSubmitting }: { isSubmitting: boolean }) => {
	return (
		<button
			className="rounded bg-neutral-500 px-4 py-2 text-neutral-200 hover:bg-neutral-700 disabled:bg-violet-700"
			type="submit"
			disabled={isSubmitting}
		>
			{isSubmitting ? "Logging in..." : "Log In"}
		</button>
	);
};
