import styles from "./TextInput.module.css";

type Props = {
  errorMessage?: string | null;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const TextInput = (props: Props) => {
  const { errorMessage, ...restProps } = props;
  return <div className={styles.container}>
    <input {...restProps} className={styles.input} />
    {errorMessage ? <span className={styles.errorMessage}>{errorMessage}</span> : null}
  </div>
};