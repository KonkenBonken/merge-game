function Board(props: {} | null) {
  // @ts-expect-error
  const size = props && props.size || 10;
  return (<div class='board'>
    {Array(size).fill(0).map(() => <div class='grid' />)}
  </div>)
}
