import Head from "next/head";
import { useForm } from "react-hook-form";
import api from "../services/api";

export default function Home() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => handleSignIn(data);

  const handleSignIn = async (data) => {
    try {
      const response = await api.post("/login", { ...data });
      console.log(response);
    } catch (_err) {
      console.log("Houve um problema com o login!");
    }
  };

  return (
    <div>
      <Head>
        <title>Web Client</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>
              {" "}
              E-mail
              <input name="email" ref={register({ required: true })} />
            </label>
            {errors.email && <span>This field is required</span>}
          </div>
          <div>
            <label>
              {" "}
              Senha
              <input
                name="password"
                type="password"
                ref={register({ required: true })}
              />
            </label>
            {errors.password && <span>This field is required</span>}
          </div>

          <input type="submit" />
        </form>
      </main>
    </div>
  );
}
