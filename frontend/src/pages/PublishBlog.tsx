import { ChangeEvent, useState } from "react";
import Appbar from "../components/Appbar";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PublishBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <Appbar />
      <div className="flex items-center justify-center w-full p-10">
        <div className="max-w-lg w-full ">
          <input
            placeholder="Title"
            type="text"
            className=" bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed "
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <TextEditor onChange={(e) => setDescription(e.target.value)} />
          <button
            onClick={async () => {
              const response = await axios.post(
                `${BACKEND_URL}/blog`,
                {
                  title,
                  content: description,
                },
                {
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                }
              );
              console.log(response);
              navigate(`/blog/${response.data.post.id}`);
            }}
            className="mt-2 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
          >
            Publish post
          </button>
        </div>
      </div>
    </div>
  );
};

function TextEditor({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <form>
      <textarea
        id="editor"
        rows={8}
        className="mt-2 rounded-lg block w-full  text-sm bg-gray-100 border border-gray-300 text-gray-900 p-2 "
        placeholder="Write an article..."
        required
        onChange={onChange}
      ></textarea>
    </form>
  );
}

export default PublishBlog;
