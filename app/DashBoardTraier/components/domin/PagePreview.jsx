export default function PagePreview() {
    const { currentPage, currentDomain } = useIntegratedStore();
  
    return (
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">المعاينة المباشرة عبر: {currentDomain?.name || 'yourdomain.com'}</h3>
        <div className="border rounded-lg p-4">
          {/* محتوى الصفحة التسويقية */}
          {currentPage?.elements?.map((element) => (
            <div key={element.id}>
              {element.type === 'text' ? (
                <h2 className="text-xl">{element.content}</h2>
              ) : (
                <img src={element.content} className="w-full h-48 object-cover" />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }