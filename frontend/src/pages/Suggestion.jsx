export default function Suggestion() {
  return (
    <div className="p-6">
      <h1>Suggestions</h1>
      <form>
        <textarea placeholder="Your suggestion..." className="border p-2 w-full h-40"></textarea>
        <button className="bg-blue-600 text-white mt-3 px-4 py-2">Submit</button>
      </form>
    </div>
  );
}
