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
    justifyContent: ' space-evenly',
    gap: 5,
    padding: '16px',
    boxShadow: ' -1px 2px 22px -5px rgba(235,159,173,1)',
    borderRadius: '5px',
    backgroundColor: '#f4fafc',
    width: '100%',
    height: '100%',
  };

  export const cardWrapperStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '10px',
  };