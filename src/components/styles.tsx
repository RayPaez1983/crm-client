export const fromWrapperStyles: React.CSSProperties = {
  width: '100%',
  display: 'flex',
 justifyContent: 'center',

};
export const fromStyles: React.CSSProperties = {
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    padding:'30px',
    gap: '20px',
    backgroundColor: '#3a3af1',
    color:'#ffffff'
  };

  export const inputStyles: React.CSSProperties = {
      display: 'block',
      padding: '5px',
      border: 'none',
      outline: 'none',
      borderRadius: '5px',
      boxSizing: 'border-box',
  }

  export const wrapperStyles: React.CSSProperties = {
    backgroundColor: '#44c3c3',
    height: '100vh',
    padding: '50px 20px',
  };

  export const menuStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row', // Valid value for flex direction
    gap: '10px',
    backgroundColor: '#3a3af1',
    color: 'white',
    padding: '10px',
    cursor: 'pointer',
    position: 'fixed',
    top: '0',
    width: '100%',
  };

  export const cardStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: '5px',
    border: '1px red solid',
    margin: '10px',
    borderRadius: '5px',
    width: 'fit-content',
    minWidth: 240,
    minHeight: 150,
  }

  export const cardWrapperStyles: React.CSSProperties ={
    padding: '40px 0px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '10px',
  }