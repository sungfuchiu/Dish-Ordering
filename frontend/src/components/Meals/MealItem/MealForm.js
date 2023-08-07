import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  json,
  redirect,
  useSubmit,
} from "react-router-dom";

import classes from "./MealForm.module.css";
import { getAuthToken } from '../../../util/auth';

function MealForm({ method, meal }) {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const submit = useSubmit();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  function startDeleteHandler(action) {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
    return;
  }

  return (
    <Form method={method} className={classes.form}>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          required
          defaultValue={meal ? meal.name : ""}
        />
      </p>
      <p>
        <label htmlFor="imageURL">Image URL</label>
        <input
          id="imageURL"
          type="url"
          name="imageURL"
          required
          defaultValue={meal ? meal.imageURL : ""}
        />
      </p>
      <p>
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          name="price"
          step=".01"
          required
          defaultValue={meal ? meal.price : 0}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={meal ? meal.description : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={startDeleteHandler}>Delete</button>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default MealForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const mealData = {
    name: data.get("name"),
    imageURL: data.get("imageURL"),
    price: Number(data.get("price")),
    description: data.get("description"),
  };

  let url = `${process.env.REACT_APP_BACKEND_URL}meals`;

  if (method === "PATCH" || method === "DELETE") {
    const mealId = params.mealId;
    url = `${process.env.REACT_APP_BACKEND_URL}meals/` + mealId;
  }

  const token = getAuthToken();
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(mealData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    if (method === "DELETE") {
      throw json(
        { message: "Could not delete event." },
        {
          status: 500,
        }
      );
    }
    throw json({ message: "Could not save meal." }, { status: 500 });
  }

  return redirect("/");
}
