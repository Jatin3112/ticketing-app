// components/ReplyList.jsx
export default function ReplyList({ replies }) {
  if (!replies?.length) {
    return <p className="text-sm text-gray-400 italic">No replies yet.</p>;
  }

  return (
    <ul className="space-y-2 pl-3 border-l-2 border-gray-300">
      {replies.map((reply) => (
        <li key={reply.id} className="text-sm text-gray-700">
          ➤ {reply.content}
        </li>
      ))}
    </ul>
  );
}
