function Board(props) {
  const { options }: { options: GameOptions } = props;

  return (<div class='board'>
    {Array(options.size).fill(0).map(() => <div class='grid' />)}
  </div>)
}
