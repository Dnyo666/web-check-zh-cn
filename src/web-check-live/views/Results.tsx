import styled from '@emotion/styled';
import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Masonry from 'react-masonry-css';

import colors from 'web-check-live/styles/colors';
import Button from 'web-check-live/components/Form/Button';
import Nav from 'web-check-live/components/Form/Nav';
import Heading from 'web-check-live/components/Form/Heading';
import Modal from 'web-check-live/components/Form/Modal';
import Footer from 'web-check-live/components/misc/Footer';
import ErrorBoundary from 'web-check-live/components/misc/ErrorBoundary';
import { type LoadingJob, type LoadingState, initialJobs } from 'web-check-live/components/misc/ProgressBar';
import ActionButtons from 'web-check-live/components/misc/ActionButtons';
import ViewRaw from 'web-check-live/components/misc/ViewRaw';
import AdditionalResources from 'web-check-live/components/misc/AdditionalResources';

const HeaderLinkContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const FilterButtons = styled.div`
  width: 95vw;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  .one-half {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
  }
  button, input, .toggle-filters {
    background: ${colors.backgroundLighter};
    color: ${colors.textColor};
    border: none;
    border-radius: 4px;
    font-family: 'PTMono';
    padding: 0.25rem 0.5rem;
    border: 1px solid transparent;
    transition: all 0.2s ease-in-out;
  }
  button, .toggle-filters {
    cursor: pointer;
    text-transform: capitalize;
    box-shadow: 2px 2px 0px ${colors.bgShadowColor};
    transition: all 0.2s ease-in-out;
    &:hover {
      box-shadow: 4px 4px 0px ${colors.bgShadowColor};
      color: ${colors.primary};
    }
    &.selected {
      border: 1px solid ${colors.primary};
      color: ${colors.primary};
    }
  }
  input:focus {
    border: 1px solid ${colors.primary};
    outline: none;
  }
  .clear {
    color: ${colors.textColor};
    text-decoration: underline;
    cursor: pointer;
    font-size: 0.8rem;
    opacity: 0.8;
  }
  .toggle-filters  {
    font-size: 0.8rem;
  }
  .control-options {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
    a {
      text-decoration: none;
    }
  }
`;

const ResultsOuter = styled.div`
  padding: 1rem;
`;

const ResultsContent = styled.div`
  margin: 1rem auto;
  width: 95vw;
`;

interface ResultsProps {
  address?: string;
}

const Results = ({ address: propAddress }: ResultsProps): JSX.Element => {
  const urlParams = useParams();
  const address = propAddress || urlParams.urlToScan || '';
  
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);

  const clearFilters = () => {
    setTags([]);
    setSearchTerm('');
  };

  const updateTags = (tag: string) => {
    setTags(tags.includes(tag) ? tags.filter(t => t !== tag) : [tag]);
  };

  const makeSiteName = (url: string): string => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch (error) {
      return url;
    }
  };

  return (
    <ResultsOuter>
      <Nav>
        { address && 
          <Heading color={colors.textColor} size="medium">
            { address.startsWith('http') && 
              <a target="_blank" rel="noreferrer" href={address}>
                <img width="32px" src={`https://icon.horse/icon/${makeSiteName(address)}`} alt="网站图标" />
              </a> 
            }
            {makeSiteName(address)}
          </Heading>
        }
        <HeaderLinkContainer>
          <a href="/"><Button>新检查</Button></a>
          <a href="/about"><Button>了解更多</Button></a>
        </HeaderLinkContainer>
      </Nav>
      <FilterButtons>{ showFilters ? <>
        <div className="one-half">
          <span className="group-label">按类型筛选</span>
          {['服务器', '客户端', '元数据'].map((tag: string) => (
            <button
              key={tag}
              className={tags.includes(tag) ? 'selected' : ''}
              onClick={() => updateTags(tag)}>
                {tag}
            </button>
          ))}
          {(tags.length > 0 || searchTerm.length > 0) && 
            <span onClick={clearFilters} className="clear">清除筛选</span>
          }
        </div>
        <div className="one-half">
          <span className="group-label">搜索</span>
          <input
            type="text"
            placeholder="筛选结果" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="toggle-filters" onClick={() => setShowFilters(false)}>隐藏</span>
        </div>
        </> : (
        <div className="control-options">
          <span className="toggle-filters" onClick={() => setShowFilters(true)}>显示筛选</span>
          <a href="#view-download-raw-data"><span className="toggle-filters">导出数据</span></a>
          <a href="/about"><span className="toggle-filters">了解检查结果</span></a>
          <a href="/about#additional-resources"><span className="toggle-filters">更多工具</span></a>
          <a target="_blank" rel="noreferrer" href="https://github.com/lissy93/web-check">
            <span className="toggle-filters">查看 GitHub</span>
          </a>
        </div>
      ) }
      </FilterButtons>
      <ResultsContent>
        <Masonry
          breakpointCols={{ 
            10000: 12, 4000: 9, 3600: 8, 3200: 7, 2800: 6, 
            2400: 5, 2000: 4, 1600: 3, 1200: 2, 800: 1 
          }}
          className="masonry-grid"
          columnClassName="masonry-grid-col"
        >
          {/* Results content will be rendered here */}
        </Masonry>
      </ResultsContent>
      <ViewRaw everything={[]} />
      <AdditionalResources url={address} />
      <Footer />
      <Modal isOpen={modalOpen} closeModal={() => setModalOpen(false)}>
        {modalContent}
      </Modal>
      <ToastContainer 
        limit={3} 
        draggablePercent={60} 
        autoClose={2500} 
        theme="dark" 
        position="bottom-right" 
      />
    </ResultsOuter>
  );
};

export default Results;
