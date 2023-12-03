import React from "react";

export default function UserRow({ userdata }) {
  const { _id, name, avatar, email, mobile } = userdata || {};

  return (
    <tr>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-18 h-18">
              <img
                style={{ height: "60px", width: "60px" }}
                className="w-18 h-18"
                src={import.meta.env.VITE_API_URL_IMG + "/avatars/" + avatar}
                alt={name}
              />
            </div>
          </div>
        </div>
      </td>
      <td>
        <div>
          <div className="font-bold">{name}</div>
          <div className="text-sm opacity-50">Bangladesh</div>
        </div>
      </td>
      <td>
        <div>ku4306053@gmail.com</div>
        <div className="ml-2">{mobile}</div>
      </td>

      <td className="flex  gap-2 mt-2">
        <button
          data-tip="view more info "
          className="btn tooltip btn-sm btn-info text-lg"
        >
          <i className="fa-regular fa-square-info"></i>
        </button>
        <button
          data-tip="Edit info "
          className="btn btn-sm btn-secondary tooltip text-lg"
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <button
          data-tip="Change Role"
          className="btn tooltip btn-sm btn-primary text-lg"
        >
          <i className="fa-solid fa-user-vneck-hair"></i>
        </button>
        <button
          data-tip="Delete User"
          className="btn btn-sm btn-error tooltip text-red-900 text-lg"
        >
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </td>
    </tr>
  );
}
