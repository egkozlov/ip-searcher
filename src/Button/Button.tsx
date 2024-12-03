import styles from "./Button.module.css";

type Props = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: Props) => {
  const { children, ...restProps } = props;
  return <button className={styles.button} {...restProps}>{children}</button>;
};