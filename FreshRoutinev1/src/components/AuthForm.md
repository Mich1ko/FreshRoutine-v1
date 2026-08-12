# AuthForm Learning Notes

`AuthForm.jsx` is a reusable React component for both login and signup screens.

## Main React Ideas

- `props`: The parent passes `mode="login"` or `mode="signup"` to decide which version of the form appears.
- Conditional rendering: The name field only renders when `mode` is `signup`.
- Component composition: `AuthForm` uses smaller helpers like `AuthField` and `GoogleLogo`.
- React Router: The bottom link switches between `/login` and `/signup` without refreshing the page.
- Form handling: `handleSubmit` uses `event.preventDefault()` so the browser does not reload.

## Why One Component?

Login and signup forms share most of the same UI. A single component keeps the design consistent and avoids copying the same email, password, Google button, and bottom prompt markup twice.

## Future Backend Connection

The form is UI-only right now. Later, `handleSubmit` is where you would call an authentication service such as Firebase, Supabase, or your own API.
