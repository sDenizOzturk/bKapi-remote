import { BaseCard, BaseWrapper } from 'binak-react-components';
import { FC, useCallback, useEffect, useState } from 'react';
import { PermanentLink } from '../../models/permanentLink';
import PermanentLinkItem from './PermanentLinkItem';
import { bounce } from '../../utils/animationVariants';
import useLoading from '../../hooks/useLoading';
import useError from '../../hooks/useError';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import urls from '../../utils/urls';
import Paginator from '../layout/Paginator';
import CreateLink from './CreateLink';
import FilterLinks from './FilterLinks';
import { useTranslation } from 'react-i18next';
import { useCopyToClipboard, useMediaQuery } from 'usehooks-ts';
import LinkDialog from './LinkDialog';

const ListLinks: FC = () => {
  const [permanentLinks, setPermanentLinks] = useState<PermanentLink[]>([]);

  const [filter, setFilter] = useState('');

  const { setLoading } = useLoading();
  const { setError } = useError();

  const token = useSelector((state: RootState) => state.auth.token);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [refetchCounter, setRefetchCounter] = useState(0);

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const url =
        urls.listLinks +
        '?' +
        new URLSearchParams({
          filter,
          page: currentPage.toString(),
        });
      const response = await fetch(url, {
        headers: {
          Authorization: 'Bearer ' + token.token,
        },
      });
      const responseData = await response.json();

      if (response.status === 200) {
        setPermanentLinks(responseData.permanentLinks);
        setCurrentPage(responseData.currentPage);
        setTotalPages(responseData.totalPages);
      } else {
        throw new Error(responseData.message);
      }
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  }, [token, filter, refetchCounter]);

  const refetchData = () => {
    setRefetchCounter(refetchCounter + 1);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const { t } = useTranslation();

  const isPortrait = useMediaQuery('(orientation: portrait)');

  const [link, setLink] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');

  const [_copiedText, copyToClipboard] = useCopyToClipboard();
  const displayLink = async (link: string, doorNumber: string) => {
    setLink(link);
    try {
      await copyToClipboard(link);
      setDialogTitle(t('Link is copied to clipboard') + ' - ' + doorNumber);
    } catch (err) {
      console.log('Link can not be copied to clipboard', err);
      setDialogTitle(t('Link is created') + ' - ' + doorNumber);
    }
  };

  const closeLinkDialog = () => {
    setLink('');
    setDialogTitle('');
  };

  return (
    <>
      <BaseCard>
        <BaseWrapper
          style={{
            display: 'grid',
            gridTemplateColumns: isPortrait ? '1fr' : '1fr 1fr',
          }}
        >
          <CreateLink
            refetch={refetchData}
            setCurrentPage={setCurrentPage}
            setDisplayingLink={displayLink}
          />

          <FilterLinks
            setFilter={(val) => {
              setFilter(val);
              setCurrentPage(0);
            }}
          />
        </BaseWrapper>
      </BaseCard>
      <BaseWrapper
        mode={['center']}
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          maxWidth: '60rem',
        }}
      >
        {permanentLinks.map((permanentLink: PermanentLink) => (
          <PermanentLinkItem
            whileHover={bounce.s.scale}
            transition={bounce.m.transition}
            key={permanentLink.doorNumber}
            permanentLink={permanentLink}
            refetch={refetchData}
            setDisplayingLink={displayLink}
          />
        ))}
      </BaseWrapper>
      {permanentLinks.length === 0 && (
        <BaseCard style={{ marginTop: '-1rem' }}>
          {filter ? t('No links found.') : t('No links created.')}
        </BaseCard>
      )}

      <Paginator
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
        refetch={refetchData}
      />

      <LinkDialog
        onClose={closeLinkDialog}
        link={link}
        dialogTitle={dialogTitle}
      />
    </>
  );
};

export default ListLinks;
