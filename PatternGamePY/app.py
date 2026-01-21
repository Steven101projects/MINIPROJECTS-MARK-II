import streamlit as st

st.set_page_config(page_title="PatternGamePY")
st.set_page_config(layout="wide")

colLeft, centerCol, colRight = st.columns([1, 3, 1])

with centerCol:
    st.title("PATTERN GAME PY")
    st.write("Simon style memory game with a 4 by 3 grid.")

    st.markdown(
        """
        <div style="
            width:100%;
            display:flex;
            justify-content:center;
        ">
            <div style="
                background-color:#0f172a;
                height:100px;
                width:100%;
                max-width:900px;
                border-radius:12px;
            ">
            </div>
        </div>
        """,
        unsafe_allow_html=True
    )
