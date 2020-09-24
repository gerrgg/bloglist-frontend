import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import Blog from "./Blog";

const user = {
  id: "987987987987",
  name: "greg b",
  username: "supergreg",
};

const blog = {
  title: "You dont know Greg",
  author: "Gregory Bastianelli",
  likes: 10,
  url: "https://shutupgreg.com",
  user: user,
};

test("renders the blogs author and title but not the url or likes by default", () => {
  const component = render(<Blog blog={blog} />);

  expect(component.container).toHaveTextContent(
    "You dont know Greg - Gregory Bastianelli"
  );
});

test("renders no author if the author is omitted from blog", () => {
  const blogWithoutAuthor = {
    title: "You dont know Greg",
    likes: 10,
    url: "https://shutupgreg.com",
    user: {},
  };

  const component = render(<Blog blog={blogWithoutAuthor} />);

  const span = component.container.querySelector("span");

  expect(span).toHaveTextContent("You dont know Greg - No Author");
});

test("shows url, likes and user once the toggle button is clicked", () => {
  const mockHandler = jest.fn();

  // pass user
  const component = render(<Blog blog={blog} user={user} />);

  // no details before button click
  expect(component.container.querySelector(".details")).toBeNull();

  const button = component.getByText("View");

  fireEvent.click(button);

  // has details after button click
  expect(component.container.querySelector(".details")).not.toBeNull();

  expect(component.container.querySelector(".url")).toHaveTextContent(
    "https://shutupgreg.com"
  );

  expect(component.container.querySelector(".likes")).toHaveTextContent("10");

  expect(component.container.querySelector(".user")).toHaveTextContent(
    user.username
  );
});

test("when a blog is liked twice - the handleLike event is called twice", () => {
  const mockHandler = jest.fn();

  const component = render(
    <Blog blog={blog} user={user} handleLike={mockHandler} />
  );

  const button = component.getByText("View");

  // expose like button
  fireEvent.click(button);

  const likeButton = component.container.querySelector(".likesButton");

  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
