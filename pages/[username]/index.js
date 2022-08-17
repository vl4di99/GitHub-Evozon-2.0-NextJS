function GitUser({ name }) {
  return <div>Git {name}</div>;
}

export default GitUser;

export async function getServerSideProps(context) {
  const d = context.query.username;

  return {
    props: {
      name: d,
    },
  };
}
