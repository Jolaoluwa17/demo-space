import './languageSelector.css';
import { languages } from '@/utils/Constants';

interface Props {
  language: string;
  handleLanguageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const LanguageSelector: React.FC<Props> = ({
  language,
  handleLanguageChange,
}) => {
  return (
    <div>
      <select
        value={language}
        onChange={handleLanguageChange}
        className="mb-4 p-2 border rounded"
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
