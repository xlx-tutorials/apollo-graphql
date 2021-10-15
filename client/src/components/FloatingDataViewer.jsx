export function FloatingDataViewer({ loading, error, data }) {
  let display = <pre>{JSON.stringify(data, null, 2)}</pre>

  if (loading) display = <h1>Loading...</h1>
  if (error) display = <p>Error: {JSON.stringify(error)}</p>

  return (
    <div
      style={{
        backgroundColor: 'slateblue',
        color: 'white',
        padding: 20,
        position: 'fixed',
        bottom: 0,
        width: '100%',
        margin: 0,
        height: 200,
        overflowY: 'auto',
        fontSize: 14,
        fontWeight: 'bold'
      }}>
      {display}
    </div>
  )
}
