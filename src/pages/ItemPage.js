import { useParams } from "react-router-dom";

function ItemPage() {
  const { id } = useParams(); // URL에서 id 추출

  return (
    <div>
      <h1>Item ID: {id}</h1>
      {/* id에 해당하는 데이터를 불러오는 로직 추가 가능 */}
    </div>
  );
}

export default ItemPage;
