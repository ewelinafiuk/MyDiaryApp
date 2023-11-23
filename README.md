## ZAI Projekt 2 
## Ewelina Fiuk, nr indeksu: 304037

</br>

### 1. Instrukcja instalacji i uruchomienia aplikacji w środowisku Node.js

Aby uruchomi aplikację najpierw trzeba przejść do folderu `my-diary`.

    cd my-diary

Następnie w folderze zainstalować potrzebne do uruchomienia biblioteki.

    npm install

Ostatnim krokiem jest zbudowanie i uruchomienie aplikacji.

    npm run

Polecenie to uruchamia aplikacje w trybie developmentu. Strona widoczna jest w przeglądarce pod adresem: Open [http://localhost:3000](http://localhost:3000).

</br>

### 2. Podjęte decyzje projektowe

Do stworzenia aplikacji wykorzystałam framework React.js. Jest to framework słuący do prostego i szykiego tworzenia aplikacji internetowych. Posiada on wiele bibliotek i gotowych komponentów, które pozwalają na implementację aplikacji.

Podczas implementacji zdecydowałam się na wykorzystanie następujacych bibliotek:
 - `@mui/icons-material` - do ikon wykorzystanych w aplikacji
 - `@mui/x-data-grid` - z zaimplementowanym komponentem tabeli. Psiada wiele opcji wbudowanych tabeli takich jak: sortowanie, filtrowanie, dodawanie nowych danych, edycja danych tabeli. 
 - `react-vertical-timeline-component` - komponent z gotową implementacją osi czasu, na której mogłam w czytelny sposób przedstawić wydarzenia dodane przez uzytkownika
 - `moment` - biblioteka do manipluacji datami, pozwala w prosty sposób porównywać daty.


</br>

### 3. Opis kodu aplikacji 

Główna klasa aplikacji znajduję się w pliku `App.js`. 
Następnie w katalogu `modules` umieściłam zaimplementowane komponenty:
 - oś czasu w pliku `timeline.js`
 - tabelę wraz z zaimplementowanymi w niej funkcjonalnościami w pliku `datagrid.js`
 - komponent tabeli z wydarzeniami w pliku `events-datagrid.js`
 - komponent tabeli z kategoriami w pliku `categories-grid.js`
W katalogu `constansts` umieściłam pliki z predefiniowanymi wydarzeniami, kategoriami, dostępnymi kolorami i ikonami do wydarzeń. 



<br/>

### 4. Zaimplementowane funkcjonalności

1. Widok osi czasu z wydarzeniami
![Alt text](image-19.png)
Wydarzenia przedstawione są na pionowej osi chronologicznie: czasu od najnowszych do najstarszych. Każde wydarzenie posiada datę początku i końca, nazwę, opis, kategorię i przypisaną mu ikonę. Kategorie mają przypisane kolory, które widnieją w tle wydarzenia.

2. Widok tabeli z wydarzeniami
![Alt text](image.png)
Tabela z wydarzeniami przedstawia wszytskie wydarzenia dodane do aplikacji. Ma ona opcję przeglądania wydarzeń, sortowania ich po kolumnach, filtrowania, dodania nowego rzędu tabeli z wydarzeniem oraz edycji każdego z wydarzeń. Można również usunąć wybrane wydarzenia.

3. Edycja wydarzenia
![Alt text](image-20.png)
![Alt text](image-4.png)
![Alt text](image-5.png)
Aby edytować wydarzenie należy nacisnąć przycisk edycji o prawej stronie wiersza. Wybrany wiersz wchodzi w try edycji i mamy możliwość zmiany danych w każdej kolumnie. Aby zakończyć edycję należy nacisnąć przycisk zapisu.

4. Dodanie nowego wydarzenia
![Alt text](image-21.png)
![Alt text](image-7.png)
![Alt text](image-9.png)
![Alt text](image-10.png)
Aby dodać nowe wydarzenie, należy nacisnąć przycisk 'Add new', na dole tabeli pokaże się nowy wierz z danymi do uzupełnienia. Po wpisaniu danych należy zapisać wiersz. Nowe wydarzenie zostanie dodane automatycznie do osi czasu powyżej.

5. Usunięcie wydarzenia
![Alt text](image-22.png)
Aby usunąć wydarzenie wystarczy kliknąć w ikone usuń w danym wierszu.

6. Sortowanie wydarzeń
![Alt text](image-11.png)
![Alt text](image-12.png)
Sortować wydarzenia można według wszytskich kolumn: rosnąco lub malejąco. Wystarczy nacisnąć przycisk strzałki obok nazwy kolumny lub ikonę 3 kropek, aby zobaczyć wszytskie opcje sortowania.

7. Filtrowanie wydarzeń
![Alt text](image-13.png)
![Alt text](image-23.png)
Aby filtrować tabelę należy również wybrać ikonę trzech kropek obok nazyw kolumny, a następnie opcję 'Filter'. Pokażą nam się wszytskie dostępne opcje filtrowania.

8. Widok tabeli z kategoriami
![Alt text](image-17.png)
Tabela z kategoriami posiada te same opcje: edycja, usuwanie, dodawanie, sortowanie i filtrowanie co tabela z wydarzeniami.
Jeśli chcemy usunąć kategorię, która jest juz używana, w wydarzeniach pokaże się nam błąd ze nie może zosać usunięta:
![Alt text](image-24.png)

9. Walidacja 
![Alt text](image-25.png)
Podczas edycji oraz dodawania nowych wydarzeń dodana jest walidacja wpisanych pól. Pola nie mogą być puste oraz data końcowa nie może być większa niż początkowa. 
