const SELECT = `
  select userId,
         username,
         name,
         surname,
         phone,
         password,
         role
  from users
`;

const SQL = {
  SELECT,
};

export default SQL;
