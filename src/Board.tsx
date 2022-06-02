function elements(amount, element) {
  return Array(amount).fill(0).map(() => element.cloneNode(true))
}

function Board(props) {
  const { options }: { options: GameOptions } = props;

  return (<div class='board'>

    <div class='row'>{elements(options.size + 2, <div class='path' />)}</div>
    {elements(options.size, <div class='row'>
      <div class='path' />
      {elements(options.size, <div class='tile' />)}
      <div class='path' />
    </div>)}

  </div>)
}
